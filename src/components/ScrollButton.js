import React, { useContext } from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';
import { UserContext } from '../context/user';

function ScrollButton() {
  const { height } = useContext(UserContext);
  const scrollBackToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (
    <button
      type="button"
      className={height > 200 ? 'scroll-btn show-scroll-btn' : 'scroll-btn'}
      onClick={scrollBackToTop}
    >
      <FaAngleDoubleUp />
    </button>
  );
}
export default ScrollButton;
