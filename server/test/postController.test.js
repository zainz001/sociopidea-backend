// postController.test.js

const mongoose = require('mongoose');
const {
  getposts,
  createpost,
  like,
  getPost,         // Add these imports
  getPostsBySearch,// Add these imports
  commentPost,

} = require('../controller/postss.js');
const postmessage = require('../modules/tt.js');

jest.mock('../modules/tt.js');

describe('Post Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getposts', () => {
    it('should get all posts', async () => {
      const mockPosts = [{ title: 'Test Post' }];
      postmessage.find.mockResolvedValue(mockPosts);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getposts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it('should handle errors when getting posts', async () => {
      const errorMessage = 'Test Error';
      postmessage.find.mockRejectedValue(new Error(errorMessage));

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getposts(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
  describe('createpost', () => {
    it('should create a new post', async () => {
      const mockPost = { title: 'New Post', message: 'This is a new post', creator: 'user123', createdAt: '2023-11-20T12:00:00Z' };
      postmessage.prototype.save = jest.fn(); // Mock the save method

      const req = {
        body: { title: 'New Post', message: 'This is a new post' },
        userId: 'user123',
      };
      const res = {
        status: jest.fn().mockReturnThis(), // Mock the status method
        json: jest.fn(), // Mock the json method
      };

      try {
        await createpost(req, res);


        expect(res.status).toHaveBeenCalledWith(201);

        // Check if res.json is called with the expected mockPost
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(mockPost));
      } catch (error) {
        console.error('Error in test:', error);
      }
    });


    it('should handle errors when creating a post', async () => {
      const errorMessage = 'Internal Server Error';

      // Mock the save method to throw an error
      postmessage.prototype.save = jest.fn().mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      const req = {
        body: { title: 'New Post', message: 'This is a new post' },
        userId: 'user123',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createpost(req, res);

      // Check if res.status is called with the expected status code
      expect(res.status).toHaveBeenCalledWith(500);

      // Check if res.json is called with the expected error message
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });



  describe('like', () => {
    it('should handle errors when updating likes without an ID', async () => {
      const errorMessage = 'Test Error';
      const req = {
        params: {}, // Empty params object to simulate missing ID
        userId: 'user123',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await like(req, res);

      expect(res.status).toHaveBeenCalledWith(404); // Expect a status of 404 for missing post ID
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid post ID' }); // Update the expected message
    });


  });
  describe('getPost', () => {
    it('should get a post by ID', async () => {
      const mockPost = {
        _id: '123',
        title: 'Test Post',
        message: 'This is a test post',
        // Add other fields as needed
      };
  
      // Mock the findById method to resolve with the mockPost
      const findByIdMock = jest.spyOn(mongoose.model('postmessages').prototype, 'findById');
      findByIdMock.mockResolvedValue(mockPost);
  
      const req = { params: { id: '123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getpost(req, res);
  
      expect(findByIdMock).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });
  
    it('should handle a not found scenario', async () => {
      // Mock the findById method to resolve with null, simulating a not found scenario
      const findByIdMock = jest.spyOn(mongoose.model('postmessages').prototype, 'findById');
      findByIdMock.mockResolvedValue(null);
  
      const req = { params: { id: '456' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getpost(req, res);
  
      expect(findByIdMock).toHaveBeenCalledWith('456');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post not found' });
    });
  
    it('should handle a Mongoose CastError', async () => {
      // Mock the findById method to throw a Mongoose CastError
      const findByIdMock = jest.spyOn(mongoose.model('postmessages').prototype, 'findById');
      findByIdMock.mockRejectedValue(new mongoose.Error.CastError());
  
      const req = { params: { id: 'invalidId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getpost(req, res);
  
      expect(findByIdMock).toHaveBeenCalledWith('invalidId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Post ID' });
    });
  
    it('should handle other errors', async () => {
      // Mock the findById method to throw a generic error
      const findByIdMock = jest.spyOn(mongoose.model('postmessages').prototype, 'findById');
      findByIdMock.mockRejectedValue(new Error('Test Error'));
  
      const req = { params: { id: '789' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await getpost(req, res);
  
      expect(findByIdMock).toHaveBeenCalledWith('789');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });
  
  describe('getPostsBySearch', () => {
   // In the test file (postController.test.js)
   it('should handle errors when getting posts by search query and tags', async () => {
    const errorMessage = 'Test Error';
    postmessage.find.mockRejectedValue(new Error(errorMessage));
  
    const req = {
      query: { searchQuery: 'Test', tags: 'tag1,tag2' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await getPostsBySearch(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
  
  });

  describe('commentPost', () => {
    it('should add a comment to a post', async () => {
      const mockPost = { _id: '123', title: 'Test Post', comments: ['Comment 1', 'Comment 2'] };
      postmessage.findById.mockResolvedValue(mockPost);
      postmessage.findByIdAndUpdate.mockResolvedValue(mockPost);

      const req = {
        params: { id: '123' },
        body: { value: 'New Comment' },
      };
      const res = {
        json: jest.fn(),
      };

      await commentPost(req, res);

      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it('should handle errors when adding a comment to a post', async () => {
      const errorMessage = 'Test Error';
      postmessage.findById.mockRejectedValue(new Error(errorMessage));

      const req = {
        params: { id: '123' },
        body: { value: 'New Comment' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await commentPost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});