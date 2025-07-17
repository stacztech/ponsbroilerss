# Deployment Guide - Pons Broilers

## Current Issues Identified

1. **Backend API returning 404 errors** - The backend deployment on Vercel is not working correctly
2. **CORS configuration** - Updated to be more robust
3. **Error handling** - Added better error handling and debugging

## Steps to Fix Connection Issues

### 1. Backend Deployment Issues

The backend is returning 404 errors, which indicates the deployment is not working correctly. Here are the fixes applied:

#### Updated Files:
- `backend/index.js` - Enhanced CORS and error handling
- `backend/vercel.json` - Fixed routing configuration
- `backend/package.json` - Added proper deployment scripts
- `backend/db/connectDB.js` - Improved database connection handling

### 2. Frontend Improvements

#### Updated Files:
- `meat-website/src/app/app.config.ts` - Added HTTP interceptor
- `meat-website/src/app/services/http-interceptor.service.ts` - Better error handling
- `meat-website/src/app/services/error-handler.service.ts` - Centralized error handling
- `meat-website/src/app/services/auth.service.ts` - Enhanced error logging

### 3. Environment Configuration

The environment files are correctly configured:
- Production: `https://ponsbroilerss-backend.vercel.app/api`
- Development: `http://localhost:9000/api`

## Deployment Checklist

### Backend (Vercel)
1. ✅ Updated CORS configuration
2. ✅ Enhanced error handling
3. ✅ Fixed Vercel routing
4. ✅ Improved database connection
5. ⏳ **Redeploy backend to Vercel**
6. ⏳ **Verify environment variables are set in Vercel dashboard**

### Frontend (Vercel)
1. ✅ Environment configuration is correct
2. ✅ Added error handling services
3. ⏳ **Redeploy frontend to Vercel**

### Environment Variables (Backend)
Make sure these are set in your Vercel dashboard:
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret key
- `NODE_ENV` - Set to "production"

## Testing Steps

1. **Test Backend Health:**
   ```bash
   curl https://ponsbroilerss-backend.vercel.app/health
   ```

2. **Test API Endpoint:**
   ```bash
   curl https://ponsbroilerss-backend.vercel.app/api/auth/check-auth
   ```

3. **Test Frontend:**
   - Visit: https://ponsbroilerss-frontend.vercel.app
   - Open browser console to check for errors
   - Try logging in to test API connection

## Common Issues and Solutions

### 1. Backend 404 Errors
- **Cause**: Vercel routing not configured correctly
- **Solution**: Updated `vercel.json` with proper routes

### 2. CORS Errors
- **Cause**: Frontend domain not in allowed origins
- **Solution**: Updated CORS configuration in `backend/index.js`

### 3. Database Connection Issues
- **Cause**: Missing or incorrect MONGO_URI
- **Solution**: Check Vercel environment variables

### 4. Authentication Issues
- **Cause**: Cookie/session handling in production
- **Solution**: Enhanced error handling and logging

## Next Steps

1. **Redeploy the backend** with the updated configuration
2. **Check Vercel logs** for any deployment errors
3. **Verify environment variables** are set correctly
4. **Test the connection** using the provided test script
5. **Monitor browser console** for any frontend errors

## Debugging Tools

- Use `test-connection.js` to test API endpoints
- Check browser console for frontend errors
- Monitor Vercel function logs for backend issues
- Use the enhanced error handling services for better debugging 