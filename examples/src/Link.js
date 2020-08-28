import React from 'react';
import PropTypes from "prop-types";

function Link({ href }) {
    return (
      <a
        target={"_blank"}
        href={href}
        className={"btn btn-sm btn-outline-secondary ml-2"}
      >
        <i className={"fas fa-code"} />
      </a>
    );
  }

  Link.propTypes = {
      href: PropTypes.string,
  };

  export default Link;