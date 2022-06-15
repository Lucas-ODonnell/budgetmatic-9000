import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/budgetpic.jpg";
import styled from "styled-components";

const LandingPage = () => {
  return (
    <Wrapper>
      <div className="landing">
        <div className="info">
          <h1>
            Budget<span>matic</span>
          </h1>
          <p>
            Lorem aliquam similique maxime illo blanditiis Nihil in quam
            veritatis non consequatur Eum voluptatem illum repellendus quo sit
            Dolorem nostrum perspiciatis sunt nisi dolore? At tempore ut ipsam
            tempora commodi?
          </p>
          <Link to="/signin" className="btn btn-landing">
            Signin/Register
          </Link>
        </div>
        <img src={main} alt="piggy-bank" className="landing-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .landing {
    min-height: calc(100vh - 6rem);
    display: grid;
    align-items: center;
    margin-top: -3rem;
    width: 90vw;
    max-width: 1120px;
    margin: 0 auto;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h1 {
    animation: moveInLeft 1s ease-out;
    margin-bottom: 1rem;
    font-weight: bold;
    color: var(--buttonPrimary);
    span {
      color: var(--buttonSecondary);
    }
  }
  p {
    animation: moveInRight 1s ease-out;
    color: var(--textAlt);
    margin-bottom: 1.5rem;
    max-width: 40em;
    font: 1rem;
  }
  .landing-img {
    display: none;
  }
  .btn {
    cursor: pointer;
    background-color: var(--buttonPrimary);
    border-radius: 100px;
    padding: 0.375rem 0.75rem;
    text-transform: capitalize;
    display: inline-block;
    font-size: 1.25rem;
    padding: 0.5rem 1.25rem;
    text-align: center;
    animation: moveInBottom 0.5s ease-out 0.75s;
    animation-fill-mode: backwards;
  }
  .btn:link {
    text-decoration: none;
  }

  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgb(0, 0, 0);
  }
  .btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgb(0, 0, 0);
  }

  @keyframes moveInLeft {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }

    80% {
      transform: translateX(10px);
    }

    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

  @keyframes moveInRight {
    0% {
      opacity: 0;
      transform: translateX(100px);
    }

    80% {
      transform: translateX(-10px);
    }

    100% {
      opacity: 1;
      transform: translate(0);
    }
  }
  @keyframes moveInBottom {
    0% {
      opacity: 0;
      transform: translateY(60px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes moveInTop {
    0% {
      opacity: 0;
      transform: translateY(-60px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (min-width: 992px) {
    .landing {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .landing-img {
      display: block;
      animation: moveInTop 0.5s ease-out 0.75s;
      animation-fill-mode: backwards;
      width: 100%;
      display: block;
      object-fit: cover;
    }
  }
`;

export default LandingPage;
