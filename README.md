![alt text](https://res.cloudinary.com/dx06ztif0/image/upload/v1679067043/1_nxj8sj.gif)

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
