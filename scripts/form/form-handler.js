import { addToCookies, addToLocalStorage } from "@storage/storage-api";
import updateTheExternalFile from "@external/save-to-external-file";

export default function handleSubmission(event) {
  // preventing default behavior
  event.preventDefault();

  // Extracting the data
  const targetElement = event.target;
  console.log(event);
  const formData = new FormData(targetElement);
  const data = Object.fromEntries(formData);

  // Given tasks
  addToCookies(data);
  addToLocalStorage(data);
  updateTheExternalFile(data);
}
