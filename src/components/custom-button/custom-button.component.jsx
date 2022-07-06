import React from "react";
import './custom-button.styles.scss';

const CustomButton = ({ 
  children,
  mainPage, 
  modal,
  ...otherButtonProps 
}) => (
  <button 
    className={`
      custom-button
      ${mainPage ? 'main-page-button': ''}
      ${modal ? 'modal-button': ''}
    `} 
    {...otherButtonProps}
  >
    {children}
  </button>
);

export default CustomButton;