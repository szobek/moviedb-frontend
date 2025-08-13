import { HttpInterceptorFn } from '@angular/common/http';

export const callInterceptor: HttpInterceptorFn = (req, next) => {
  const userString = localStorage.getItem("user");
  if (!userString) {
    return next(req);
  }

  try {
    const user = JSON.parse(userString);
    if (user && user.accessToken) {
      const modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      return next(modifiedReq);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return next(req);
  }
  return next(req);
};
