# Ecommerce Template

![alt text](https://res.cloudinary.com/dx06ztif0/image/upload/v1679067043/1_nxj8sj.gif)

`React`
`Typescript`
`Firebase`
`Recoil`
`Tanstack quey`
`Apexcharts`
`Tailwind CSS`
`React hook form`
`React player`
`React router dom`
`Framer motion`

## [View Live](https://the-new-kim.github.io/ecommerce-front/) 👈

- [English](#en)
- [한국어](#kr)

# EN

## Project Overview:

Ecommerce Template built with React, Firebase, and Stripe. Recoil was introduced to manage the global state on the client side. The top-level component detects changes in customer state using events such as Firebase's onAuthStateChanged and updates accordingly, reducing unnecessary repetitions in child components. Data caching was implemented using React Query. When there is a change in state, the refetch or mutation function is triggered to minimize unnecessary requests to the server

## What I did:

- Payment using Stripe
- Products:
  - Search by product name
  - Reviews
- Customers:
  - Sign in, Sign out, Edit profile
  - Wishlist, Cart, Checkout, Order history
- Admin panel:
  - Dashboard: Visualization of data using graphs for sales performance, order status, and other metrics.
  - Products: registration and modification of products, addition of image files using drag and drop, and other related functionalities.
  - Orders: Reporting and updating of order status.

## Conclusion:

- Became proficient in using Firebase Auth and Firestore
- Implemented animations using Lottie files

## What’s next?:

- Introduce Google Cloud Functions
- Packaging commonly used Components and Hooks into packages
- Deep research on payment-related security
- Improvements to Firestore rules

# KR

## Project Overview:

React + Firebase + Stripe 를 이용한 Ecommerce Template. Client side의 전역 상태를 관리를 위해 Recoil도입. 이를 이용한 Customer 상태를 최상위 Component가 감지 그리고 상태변화에 따른 업데이트를 Firebase 의 onAuthStateChanged와 같은 이벤트를 통해 실행함으로써 자식 Components의 불필요한 반복을 줄임. React query를 이용한 Data cashing. 상태변화시 Refetch 혹은 Mutation function을 발동 시킴으로써 서버로부터 불필요한 요청을 최소화함.

## What I did:

- Stripe를 이용한 카드결제
- Products:
  - Search by product name
  - 상품평, 리뷰
- Customers:
  - 회원가입, 로그인, 정보수정
  - Wishlist, Cart, Checkout, Order history 등
- Admin panel:
  - Dashboard: 현 판매 실적, 주문상황 등을 그래프와 수치를 이용하여 보여줌
  - Products: 상품의 등록 및 수정, 드래그를 이용한 Image file 추가 등
  - Orders: 주문 상황의 상태보고 및 변경

## Conclusion:

- Firebase-auth, Firestore 사용에 능숙해짐
- Lottie files를 활용한 애니메이션

## What’s next?:

- Google cloud functions 를 도입
- 자주 사용하는 Components와 Hooks 의 Package화
- 결제관련 보안에 대한 깊은 연구
- Firestore rules 개선 등

## Gallery:

![gallery1](https://res.cloudinary.com/dx06ztif0/image/upload/v1679066290/Screen_Recording_2023-03-18_at_0.11.27_2_wxiakp.gif)
