async function getClassNames() {
    const response = await fetch('http://127.0.0.1:8000/api/classes');
    if (!response.ok) {
        console.error('Failed to fetch class names');
        return [];
    }
    return await response.json();
}

async function getAbsen() {
    const response = await fetch('http://127.0.0.1:8000/api/absen');
    if (!response.ok) {
        console.error('Failed to fetch');
        return [];
    }
    return await response.json();
}
async function getAbsenExit() {
    const response = await fetch('http://127.0.0.1:8000/api/absenExit');
    if (!response.ok) {
        console.error('Failed to fetch');
        return [];
    }
    return await response.json();
}

async function getBerita() {
    const response = await fetch('http://127.0.0.1:8000/api/berita');
    if (!response.ok) {
        console.error('Failed to fetch');
        return [];
    }
    return await response.json();
}

async function getGuru() {
    const response = await fetch('http://127.0.0.1:8000/api/getGuruList');
    if (!response.ok) {
        console.error('Failed to fetch');
        return [];
    }
    return await response.json();
}
async function get3DaysSuhu() {
    const response = await fetch('http://127.0.0.1:8000/api/get3DaysSuhu');
    if (!response.ok) {
        console.error('Failed to fetch');
        return [];
    }
    return await response.json();
}