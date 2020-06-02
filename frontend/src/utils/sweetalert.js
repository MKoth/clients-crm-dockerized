import Swal from "sweetalert2";

export const successAlert = () => {
  Swal.fire({
    title: "Thank you!",
    text: "Your info has been saved successfully!",
    icon: "success",
    confirmButtonColor: "#809f1d"
  });
}

export const errorAlert = (error) => {
  Swal.fire({
    title: "Error happend!",
    text: error,
    icon: "warning",
    confirmButtonColor: "#809f1d"
  });
}