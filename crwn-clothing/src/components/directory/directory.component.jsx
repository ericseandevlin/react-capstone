import './directory.styles.scss'
import DirectoryItem from '../directory-item/directory-item.component';

const CategoryMenu = ({ categories }) => {

  return (

    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category}></DirectoryItem>
      ))}
    </div>

  )
}

export default CategoryMenu