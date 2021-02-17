export async function Toast(message: string, color: string) {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = 2000;
  toast.color = color;
  toast.position = "bottom";

  document.body.appendChild(toast);
  return toast.present();
}
