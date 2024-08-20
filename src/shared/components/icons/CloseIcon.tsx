import React from "react";

import type { SVGProps } from "~/constants";

export const CloseIcon = ({ className, ...props }: SVGProps) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path
      fillRule='evenodd'
      d='M6.69671 5.78245C6.30618 5.39192 5.67302 5.39192 5.28249 5.78245C4.89197 6.17297 4.89197 6.80614 5.28249 7.19666L10.2322 12.1464L4.57539 17.8033C4.18486 18.1938 4.18486 18.827 4.57539 19.2175C4.96591 19.608 5.59908 19.608 5.9896 19.2175L11.6465 13.5606L17.3033 19.2175C17.6938 19.608 18.327 19.608 18.7175 19.2175C19.108 18.827 19.108 18.1938 18.7175 17.8033L13.0607 12.1464L18.7175 6.48955C19.108 6.09903 19.108 5.46587 18.7175 5.07534C18.327 4.68482 17.6938 4.68482 17.3033 5.07534L11.6465 10.7322L6.69671 5.78245Z'
    />
  </svg>
);

export const CloseCircleIcon = ({ className, ...props }: SVGProps) => (
  <svg
    viewBox='0 0 24 24'
    fill='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path d='M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z' />
    <path
      fillRule='evenodd'
      d='M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z'
    />
  </svg>
);
