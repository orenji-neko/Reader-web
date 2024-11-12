import PropTypes from "prop-types"

const Book = ({ title, author, coverSrc }) => {

    return (
        <div>
            <img src={coverSrc} alt="cover" />
            <p>{title}</p>
            <p>{author}</p>
        </div>
    )
}
Book.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    coverSrc: PropTypes.string
}

export default Book;