import React, { useState } from "react";
import { axiosWithAuth } from "../utils";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, updateEditing] = useState(false);
  const [adding, updateAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const setEditing = (bool) => {
    updateEditing(bool);
    updateAdding(false);
  };
  const setAdding = (bool) => {
    updateAdding(bool);
    updateEditing(false);
  };

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log(res);
        //res.data is updated color
        updateColors([
          ...colors.filter((x) => x.id !== colorToEdit.id),
          res.data,
        ]);
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        updateColors([...colors.filter((x) => x.id !== res.data)]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/colors", newColor)
      .then((res) => {
        updateColors(res.data);
        setNewColor(initialColor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="colors-wrap">
      <p>
        colors
        <span className="button-row">
          <button onClick={() => setAdding(true)}>add</button>
        </span>
      </p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      {adding && (
        <form>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={(e) => {
                setNewColor({ ...newColor, color: e.target.value });
              }}
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) => {
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value },
                });
              }}
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit" onClick={addColor}>
              submit
            </button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}

      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit" onClick={saveEdit}>
              save
            </button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
