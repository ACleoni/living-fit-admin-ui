import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Dropzone } from './Dropzone';
import { upload } from '../api/upload';
import { 
  ExerciseCategories, 
  FormLabels, 
  FormPlaceholders
} from '../utils/constants';

const ExerciseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'abs',
    sets: '',
    reps: '',
    rest: '',
    video: {},
    tallImage: {},
    squareImage: {},
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    upload(formData);
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if ((!(Number.isInteger(parseInt(value)))) || (Number.isInteger(parseInt(value)) && value > -1))  {
      setFormData({
        ...formData,
        [name]: value
      });
    };
  }

  const updateFormData = (file, id) => {
    setFormData({
      ...formData,
      [id]: file
    })
  }

  return (
    <Container className='mt-5'>
      <h2 className='mb-4'>{FormLabels.title}</h2>
      <Form onSubmit={e => {handleSubmit(e)}}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>{FormLabels.name}</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              placeholder={FormPlaceholders.name}
              value={formData.name} 
              onChange={handleChange}
              required={true}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>{FormLabels.category}</Form.Label>
          <Form.Control 
            as='select' 
            type="text" 
            name="category" 
            placeholder={FormPlaceholders.category} 
            value={formData.category} 
            onChange={handleChange}
            required={true}
          >
            ${Object.entries(ExerciseCategories).map((category, key) => {
                return <option key={key} value={category[1]}>{category[1]}</option>
              })
            }
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="sets">
          <Form.Label>{FormLabels.sets}</Form.Label>
          <Form.Control 
            type="number" 
            name="sets" 
            placeholder={ formData.category === ExerciseCategories.hiit ? "" : FormPlaceholders.sets } 
            value={formData.sets} 
            onChange={handleChange}
            maxLength={2}
            disabled={formData.category === ExerciseCategories.hiit} 
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="reps">
          <Form.Label>{FormLabels.reps}</Form.Label>
          <Form.Control 
            type="number" 
            name="reps" 
            placeholder={ formData.category === ExerciseCategories.hiit ? "" : FormPlaceholders.reps } 
            value={formData.reps} 
            onChange={handleChange}
            maxLength={3}
            disabled={formData.category === ExerciseCategories.hiit}
            required={true}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="rest">
          <Form.Label>{FormLabels.rest}</Form.Label>
          <Form.Control 
            type="number" 
            name="rest" 
            placeholder={ formData.category === ExerciseCategories.hiit ? "" : FormPlaceholders.rest } 
            value={formData.rest} 
            onChange={handleChange}
            maxLength={3}
            disabled={formData.category === ExerciseCategories.hiit}
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{FormLabels.video}</Form.Label>
          <Dropzone dropzoneId="dropzone-video" inputId="video" name="video" updateFormData={updateFormData} accept={'video/*'} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{FormLabels.tallImage}</Form.Label>
          <Dropzone dropzoneId="dropzone-9-16" inputId="tallImage" name="9:16 image" updateFormData={updateFormData} accept={'image/*'} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{FormLabels.squareImage}</Form.Label>
          <Dropzone dropzoneId="dropzone-1-1" inputId="squareImage" name="1:1 image" updateFormData={updateFormData} accept={'image/*'} />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ExerciseForm;
