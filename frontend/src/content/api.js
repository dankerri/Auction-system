
const fetchData = async () => {
    try {
        const response = await fetch("http://localhost:5000/commodityList");
        const data = await response.json();
        return data
    } catch (e) {
        console.log(e)
    }
}

export default fetchData
