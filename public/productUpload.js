import { db, collection, addDoc } from './firebaseConfig.js';

const API_URL = 'CLOUDINARY_URL=cloudinary://<934612511675946>:<G2XDUiQBsl23oOjNkQaQrpoDC1M>@dhbwlyzfe';
const UPLOAD_PRESET = 'dqpgumg6';

const uploadForm = document.getElementById('upload-form');

async function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    return data.secure_url;
}

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const imageFile = document.getElementById('image').files[0];

    const imageUrl = await uploadImage(imageFile);

    const productData = { name, description, price, image: imageUrl };

    try {
        const productsRef = collection(db, 'products');
        await addDoc(productsRef, productData);
        alert('Product uploaded successfully!');
        uploadForm.reset();
    } catch (err) {
        console.error('Error uploading product:', err);
        alert('Failed to upload product.');
    }
});
