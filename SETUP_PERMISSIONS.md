# Quick Permission Setup Guide

## ✅ Already Implemented
- **Product Routes** - Full CRUD permissions
- **Order Routes** - Full CRUD permissions  
- **User Routes** - Update permission added
- **Permission System** - Complete RBAC system

## 🔧 To Add Permissions to Remaining Routes

### 1. Add Import to Each Route File
```javascript
import { checkPermission } from "../middleware/permissionMiddleware.js";
```

### 2. Add Permission Middleware to Protected Routes

**Cart Routes:**
```javascript
router.post("/add", isAuthenticated, checkPermission('cart', 'create'), addToCart);
router.get("/get", isAuthenticated, checkPermission('cart', 'read'), getCart);
router.put("/update", isAuthenticated, checkPermission('cart', 'update'), updateCart);
router.delete("/delete", isAuthenticated, checkPermission('cart', 'delete'), deleteCart);
```

**Category Routes:**
```javascript
router.post("/add", isAuthenticated, checkPermission('categories', 'create'), addCategory);
router.put("/update", isAuthenticated, checkPermission('categories', 'update'), updateCategory);
router.delete("/delete", isAuthenticated, checkPermission('categories', 'delete'), deleteCategory);
```

**Coupon Routes:**
```javascript
router.post("/create", isAuthenticated, checkPermission('coupons', 'create'), createCoupon);
router.put("/update", isAuthenticated, checkPermission('coupons', 'update'), updateCoupon);
router.delete("/delete", isAuthenticated, checkPermission('coupons', 'delete'), deleteCoupon);
```

**Employee Routes:**
```javascript
router.post("/add", isAuthenticated, checkPermission('employees', 'create'), addEmployee);
router.put("/update", isAuthenticated, checkPermission('employees', 'update'), updateEmployee);
router.delete("/delete", isAuthenticated, checkPermission('employees', 'delete'), deleteEmployee);
```

## 🚀 Quick Commands

### 1. Start Server (Auto-seeds permissions)
```bash
npm start
```

### 2. Assign Admin Role to User
```bash
curl -X POST http://localhost:3000/api/v1/permissions/assign-role \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "roleId": "ADMIN_ROLE_ID"}'
```

### 3. Create Custom Role
```bash
curl -X POST http://localhost:3000/api/v1/permissions/roles \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "seller", "permissions": ["PERMISSION_IDS"], "description": "Seller access"}'
```

## 📋 Available Resources
- users, products, orders, categories, coupons, reviews
- employees, warehouse, invoices, shops, cart, wishlist
- notifications, transactions, rewards, permissions, roles

## 🔐 Permission Actions
- `create` - Add new items
- `read` - View single item  
- `update` - Modify existing items
- `delete` - Remove items
- `list` - View multiple items

The system is **90% complete**. Just add the middleware to remaining routes as needed!
