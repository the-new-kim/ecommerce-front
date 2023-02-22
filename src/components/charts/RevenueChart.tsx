import { orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { orderCollection } from "../../firebase/config";
import useFirebaseDocs from "../../firebase/hooks/useFirebaseDocs";
import { getFirebaseDocs } from "../../firebase/utils";
import { IOrderWithId } from "../OrderCard";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { centToDollor } from "../../libs/utils";

const getLastMonthes = () => {
  const currentDate = new Date();
  const previousYear = currentDate.getFullYear() - 1;
  const lastMonths = [];

  for (let i = 0; i < 12; i++) {
    const monthIndex = i + currentDate.getMonth() + 1;

    lastMonths.push(
      new Date(previousYear, monthIndex).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
      })
    );
  }

  return lastMonths;
};

export default function RevenueChart() {
  const { docs: orders } = useFirebaseDocs<IOrderWithId[]>(() =>
    getFirebaseDocs(orderCollection, orderBy("createdAt", "desc"))
  );

  const [options] = useState<ApexOptions>({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: getLastMonthes(),
    },
    yaxis: {
      labels: {
        formatter(val, opts) {
          return centToDollor(val);
        },
      },
    },
  });

  const [series, setSeries] = useState<ApexOptions["series"]>([]);

  useEffect(() => {
    const orderData: { [key: string]: number } = {};

    if (orders) {
      orders.forEach((order) => {
        const orderMonth = new Date(order.createdAt).toLocaleDateString(
          undefined,
          {
            year: "numeric",
            month: "short",
          }
        );

        if (!orderData[orderMonth]) {
          orderData[orderMonth] = order.paymentIntent.amount;
        } else {
          orderData[orderMonth] += order.paymentIntent.amount;
        }
      });
    }

    const orderSeriesData = getLastMonthes().map((month) => {
      if (orderData[month]) {
        return orderData[month];
      } else {
        return 0;
      }
    });

    setSeries([
      {
        name: "order",
        data: orderSeriesData,
      },
    ]);
  }, [orders]);

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height="300px"
    />
  );
}
