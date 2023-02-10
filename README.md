### Todos...

- [x] Beautiful dnd for images
- [ ] Multiple files upload
- [ ] Admin Menu
- [ ] Category
- [ ] Wishlist
- [ ] Cart
- [x] CRUD product with stripe api
- [x] Payment(stripe)
- [ ] Delete stripe files
- [ ] Oder process

### Payment steps...

1. Create new stripe payment intent to get client secret.
2. Set checkout option with client secret.
3. Create stripe's Element component.
4. Handle payment submit event.
5. Redirect & Empty cart & Add cart products to order

### Routes

## global

- /
- /cart
- /wishlist
- /search
- /products/:category
- /products/:category/:id

## loggedIn?

- /users/:id

## !loggedIn?

- /auth

## isAdmin?

- /admin
- /admin/products
- /admin/products/add
- /admin/products/:productId
- /admin/users/
- /admin/users/add
- /admin/users/:userId

### Odering...

order model
{
orderer: users id
placedAt || createdAt ???
productID:string
shipping:boolean
total:number
}

### useFirebaseDocs.....Hook
