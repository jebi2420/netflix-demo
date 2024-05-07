import Dropdown from 'react-bootstrap/Dropdown';
import './DropdownList.css'

function DropdownList({title, items, onsSelectedItem}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item 
            key={index} 
            href="#"
            onClick={()=> onsSelectedItem(item)}>
              {item.text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownList;