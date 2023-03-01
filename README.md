### URL

## global

- / .........................(✅)
- /cart .....................(👷‍♀️)
- /wishlist .................(✅)
- /search ...................(✅)
- /products/:id .............(✅)
- /auth .....................(✅)

## checkout

- /checkout/information .....(✅)
- /checkout/shipping ........(✅)
- /checkout/payment .........(✅)

## admin

- /admin ....................(✅)
- /admin/products ...........(✅)
- /admin/products/add .......(✅)
- /admin/products/:id .......(✅)
- /admin/users/ .............(✅)
- /admin/users/add ..........(❌)
- /admin/users/:id ..........(❌)
- /admin/orders/ ............(✅)
- /admin/orders/:id .........(✅)

## me

- /me .......................(❌)
- /me/orders ................(✅)
- /me/addresses .............(✅)

### Todos...

- [x] Beautiful dnd for images
- [x] Multiple files upload
- [x] Admin Menu (Responsive)
- [x] Wishlist
- [ ] Cart (Refactoring..., replacing useCartProducts...)
- [x] Payment(stripe)
- [x] Form component
- [x] Handle loading (Tanstack query & Loading page)
- [ ] Container for wishlist & search
- [x] Signin & Signup... better logic...
- [ ] Firebase functions

### Extra todos...

- [ ] Category or Hashtags
- [x] Product reviews & rating
- [ ] Clean types

### Charts

- [x] Revenue
- [ ] Product sold
- [ ] Customer count

### Cart

1. Information ===> address and cart products...
2. Payment
3. Confirmation

### Payment steps...

1. Create new stripe payment intent to get client secret.
2. Set checkout option with client secret.
3. Create stripe's Element component.
4. Handle payment submit event.
5. Redirect & Empty cart & Add cart products to order
