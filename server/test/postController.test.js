// postController.test.js

const mongoose = require('mongoose');
const {
  getposts,
  createpost,
  
  like,
  
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
  
});