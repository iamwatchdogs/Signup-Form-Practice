export default async function updateTheExternalFile(data) {
  try {
    const fileHandle = await window.showSaveFilePicker();
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
  } catch (err) {
    console.error(err);
  }
}
