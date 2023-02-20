### URL

## global

- / .........................(✅)
- /cart .....................(✅)
- /wishlist .................(👷‍♀️)
- /search ...................(✅)
- /products/:id .............(✅)
- /auth .....................(👷‍♀️)

## checkout

- /checkout/information .....(✅)
- /checkout/shipping ........(✅)
- /checkout/payment .........(✅)

## admin

- /admin ....................(❌)
- /admin/products ...........(✅)
- /admin/products/add .......(✅)
- /admin/products/:id .......(✅)
- /admin/users/ .............(❌)
- /admin/users/add ..........(❌)
- /admin/users/:id ..........(❌)
- /admin/orders/ ............(❌)
- /admin/orders/:id .........(❌)

## me

- /me .......................(✅)
- /me/addresses .............(✅)
- /me/orders/:id ............(❌)

### Todos...

- [x] Beautiful dnd for images
- [ ] Multiple files upload
- [ ] Admin Menu
- [ ] Wishlist
- [x] Cart
- [x] Payment(stripe)
- [ ] Form component

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
