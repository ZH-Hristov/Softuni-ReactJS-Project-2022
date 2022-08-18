const CreateProduct = () => {

    const onSubmit = (e) => {
        e.preventDefault()

        const gameData = Object.fromEntries(new FormData(e.target))

        console.log(gameData)
    }

    return (
        <div className="create-container">
            <form id="create" onSubmit={onSubmit}>
                <h1>Create Product Listing</h1>
                <label htmlFor="product-title">Product name:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter Product Title"
                />
                <label htmlFor="product-size">Product Size:</label>
                <select id="product-size" name="product-size">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <label htmlFor="product-price">Product Price:</label>
                <input
                    type="number"
                    id="product-price"
                    name="product-price"
                    min={1}
                    step={0.01}
                    placeholder={4.99}
                />
                <label htmlFor="product-image-url">Product Image Link:</label>
                <input
                    type="text"
                    id="product-image-url"
                    name="image-url"
                    placeholder="https://imgur.com/myImage.jpg"
                />
                <label htmlFor="product-additional-details">Additional Details:</label>
                <textarea name="product-additional-details" id="product-additional-details" defaultValue="" />

                <input
                    className="btn submit"
                    type="submit"
                    value="Create"
                />
            </form>
        </div>
    )
}

export default CreateProduct