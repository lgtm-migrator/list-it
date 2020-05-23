import globalStylesheet from "../../../globalStylesheet";

export default class ButtonStyle extends globalStylesheet {
  constructor() {
    super();
    this.buttonDiv = {
      display: "flex",
      justifyContent: "center",
      visibility: "visible",
      opacity: "1",
    };
    this.buttonRound = {
      borderRadius: "50%",
      padding: "6px",
    };
    this.buttonNoBorder = {
      borderColor: "transparent",
      boxShadow: "none",
    };
    this.buttonOpaque = {
      opacity: "0.7",
    };
    this.buttonOpaqueHover = {
      opacity: "1",
    };
    this.buttonAdd = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "6px",
    };
    this.buttonAddIcon = {
      margin: "2px",
    };
  }
}

// let button;
// export default button = {
// buttonDiv: {
//   display: "flex",
//   justifyContent: "center",
//   visibility: "visible",
//   opacity: "1",
// },
// buttonRound: {
//   borderRadius: "50%",
//   padding: "6px",
// },
// buttonNoBorder: {
//   borderColor: "transparent",
//   boxShadow: "none",
// },
// buttonOpaque: {
//   opacity: "0.7",
// },
// buttonOpaqueHover: {
//   opacity: "1",
// },
// buttonAdd: {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   margin: "6px",
// },
// buttonAddIcon: {
//   margin: "2px",
// },
// };