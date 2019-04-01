let list = [...Array(100).keys()]

list = list.map((item)=>{
	return `cid_${item}.jpg`
})

console.log(list)
