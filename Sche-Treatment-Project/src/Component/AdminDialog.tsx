export function Dialog() {
  const dialog: string = "Success";
  //  @{ string dia_log = Session["dia-log"] as string;}
  if (dialog != "") {
    if (dialog.substring(0, 3) === "Suc") {
      return (
        <span
          className="dia-log"
          style={{
            border: "2px solid #fff",
            color: "#fff",
            background: "rgba(12,183,166,0.11)",
          }}
        >
          {dialog}
        </span>
      );
    } else {
      return (
        <span
          className="dia-log"
          style={{
            border: "1px solid #b50000",
            color: "#e30000",
            background: "rgba(207,0,0,0.11)",
          }}
        >
          {dialog}
        </span>
      );
    }
  } else {
    return null; // Trả về null nếu dialog là null
  }
  // Session.Remove("dia-log");
}
