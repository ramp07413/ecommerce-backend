# Permission System API Documentation

## Overview
This system implements Role-Based Access Control (RBAC) with granular permissions for resources and CRUD operations.

## API Endpoints

### Permissions Management

#### Create Permission
```
POST /api/v1/permissions/permissions
```
**Body:**
```json
{
  "name": "manage_products",
  "resource": "products",
  "actions": ["create", "read", "update", "delete", "list"],
  "description": "Full product management access"
}
```

#### Get All Permissions
```
GET /api/v1/permissions/permissions
```

### Role Management

#### Create Role
```
POST /api/v1/permissions/roles
```
**Body:**
```json
{
  "name": "product_manager",
  "permissions": ["permission_id_1", "permission_id_2"],
  "description": "Product management role"
}
```

#### Get All Roles
```
GET /api/v1/permissions/roles
```

#### Update Role Permissions
```
PUT /api/v1/permissions/roles/:roleId/permissions
```
**Body:**
```json
{
  "permissions": ["permission_id_1", "permission_id_2", "permission_id_3"]
}
```

### User Role Assignment

#### Assign Role to User
```
POST /api/v1/permissions/assign-role
```
**Body:**
```json
{
  "userId": "user_id",
  "roleId": "role_id"
}
```

#### Get User Permissions
```
GET /api/v1/permissions/users/:userId/permissions
```

## Usage in Routes

### Adding Permission Check to Routes
```javascript
import { checkPermission } from '../middleware/permissionMiddleware.js';

// Example: Only users with 'create' permission on 'products' can access
router.post('/products', isAuthenticated, checkPermission('products', 'create'), createProduct);
```

### Available Actions
- `create` - Create new resources
- `read` - View individual resources
- `update` - Modify existing resources
- `delete` - Remove resources
- `list` - View multiple resources

### Default Roles Created
1. **admin** - Full system access
2. **buyer** - Customer access (view products, manage cart, view orders)

## Permission Resources
- `users` - User management
- `products` - Product management
- `orders` - Order management
- `categories` - Category management
- `coupons` - Coupon management
- `reviews` - Review management
- `permissions` - Permission management
- `roles` - Role management
- `cart` - Shopping cart

## Error Responses
```json
{
  "success": false,
  "message": "Access denied. Required permission: create on products"
}
```
