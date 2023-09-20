import React, { useState, useEffect } from 'react';
import Achitecture1 from '../assets/architecture/architecture (1).jpg';
import Achitecture2 from '../assets/architecture/architecture (2).jpg';
import Achitecture3 from '../assets/architecture/architecture (3).jpg';
import Achitecture4 from '../assets/architecture/architecture (4).jpg';
import Achitecture5 from '../assets/architecture/architecture (5).jpg';
import Achitecture6 from '../assets/architecture/architecture (6).jpg';
import Achitecture7 from '../assets/architecture/architecture (7).jpg';
import Achitecture8 from '../assets/architecture/architecture (8).jpg';
import Achitecture9 from '../assets/architecture/architecture (9).jpg';
import Achitecture10 from '../assets/architecture/architecture (10).jpg';
import Nature1 from '../assets/nature/nature (1).jpg';
import Nature2 from '../assets/nature/nature (2).jpg';
import Nature3 from '../assets/nature/nature (3).jpg';
import Nature4 from '../assets/nature/nature (4).jpg';
import Nature5 from '../assets/nature/nature (5).jpg';
import Nature6 from '../assets/nature/nature (6).jpg';
import Nature7 from '../assets/nature/nature (7).jpg';
import Nature8 from '../assets/nature/nature (8).jpg';
import Nature9 from '../assets/nature/nature (9).jpg';
import Nature10 from '../assets/nature/nature (10).jpg';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

const imageData = [
  {
    id: 1,
    src: Achitecture1,
    tags: ['city', 'architecture']
  },
  {
    id: 2,
    src: Achitecture2,
    tags: ['city', 'architecture']
  },
  {
    id: 3,
    src: Achitecture3,
    tags: ['city', 'architecture']
  },
  {
    id: 4,
    src: Achitecture4,
    tags: ['city', 'architecture']
  },
  {
    id: 5,
    src: Achitecture5,
    tags: ['city', 'portrait']
  },
  {
    id: 6,
    src: Achitecture6,
    tags: ['city', 'portrait']
  },
  {
    id: 7,
    src: Achitecture7,
    tags: ['city', 'portrait']
  },
  {
    id: 8,
    src: Achitecture8,
    tags: ['city', 'portrait']
  },
  {
    id: 9,
    src: Achitecture9,
    tags: ['city', 'architecture']
  },
  {
    id: 10,
    src: Achitecture10,
    tags: ['city', 'architecture']
  },
  {
    id: 11,
    src: Nature1,
    tags: ['nature', 'landscape']
  },
  {
    id: 12,
    src: Nature2,
    tags: ['nature', 'portrait']
  },
  {
    id: 13,
    src: Nature3,
    tags: ['nature', 'portrait']
  },
  {
    id: 14,
    src: Nature4,
    tags: ['nature', 'landscape']
  },
  {
    id: 15,
    src: Nature5,
    tags: ['nature', 'landscape']
  },
  {
    id: 16,
    src: Nature6,
    tags: ['nature', 'landscape']
  },
  {
    id: 17,
    src: Nature7,
    tags: ['nature', 'landscape']
  },
  {
    id: 18,
    src: Nature8,
    tags: ['nature', 'landscape']
  },
  {
    id: 19,
    src: Nature9,
    tags: ['nature', 'landscape']
  },
  {
    id: 20,
    src: Nature10,
    tags: ['nature', 'landscape']
  },
];

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  margin-top: 50px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GalleryItem = ({ image, index, moveImage }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { id: image.id, index },
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      className={`gallery-item ${isDragging ? 'dragging' : ''}`}
      ref={(node) => drag(drop(node))}
    >
      <img src={image.src} alt={`Item ${image.id}`} />
      <div className="tags">
        {image.tags.map((tag, tagIndex) => (
          <span key={tag} className="tag">
            {tagIndex > 0 && ' '}
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImages(imageData)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const updatedImages = [...images];
    const draggedImage = updatedImages[dragIndex];

    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);

    setImages(updatedImages);
  };

  return (
    <div>
      <h1 className="headerText">Image Gallery</h1>
      <input
        type="text"
        placeholder="Search by tag"
        value={searchQuery}
        onChange={handleSearch}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="gallery-grid">
          {images
            .filter(image =>
              image.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
            )
            .map((image, index) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={index}
                moveImage={moveImage}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;