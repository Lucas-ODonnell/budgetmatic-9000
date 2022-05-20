import React from "react";
import moment from "moment";
import colors from "./colors";

const Entry = ({
  category,
  name,
  price,
  date,
  id,
  handleDelete,
  FontAwesomeIcon,
}) => (
  <tr className={colors[category]}>
    <td className="entry-col">{category}</td>
    <td className="entry-col">{name}</td>
    <td className="entry-col">{price}</td>
    <td className="entry-col">{moment(date).format("dddd Do, MMM YYYY")}</td>
    <td className="entry-col delete">
      <button
        onClick={() => {
          handleDelete(id);
        }}
      >
        <FontAwesomeIcon icon="fas fa-times" />
      </button>
    </td>
  </tr>
);

export default Entry;
