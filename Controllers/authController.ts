import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../DatabaseHelpers';
import dotenv from 'dotenv';
import { User } from '../Models/AuthModel';
import { RegisterSchema } from '../Helpers';
import { sendRegistrationEmail } from '../Nodemailer';

dotenv.config();

const dbHelper = new DbHelper();

export const registerUser = async (req: Request, res: Response) => {
    try {
      const { error } = RegisterSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
      const { Name, Email, Password, isAdmin } = req.body;
  
      const hashedPassword = await bcrypt.hash(Password, 10);
      const user: User = {
        Id: uuidv4(),
        Name,
        Email,
        Password: hashedPassword,
        isAdmin,
        isDeleted: 0,
        isEmailSent: 0
      };
  
      await dbHelper.exec('addUser', {
        Id: user.Id,
        Name: user.Name,
        Email: user.Email,
        Password: user.Password,
        isAdmin: user.isAdmin,
        isDeleted: user.isDeleted,
        isEmailSent: user.isEmailSent
      });
  
      await sendRegistrationEmail(user);
  
      res.status(201).json({ message: 'User registered successfully' });
  
    } catch (err) {
      res.status(500).json({ error: err });
    }
  };

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await dbHelper.get('getUserByEmail', { email });

    // if (!user) return res.status(404).json({ message: 'User not found' });

    // const isMatch = await bcrypt.compare(password, user.Password);
    // if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ Sub: user.Id, Name: user.Name, isAdmin: user.isAdmin }, process.env['SECRET'] as string);

    res.json({ token });
  } catch (error:any) {
    res.status(500).json( error.message);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await dbHelper.getAll('getUsers');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await dbHelper.get('getUserById', { id: req.params['id'] });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await dbHelper.exec('updateUser', { id: req.params['id'], name, email, password: hashedPassword, isAdmin });

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await dbHelper.exec('deleteUser', { id: req.params['id'] });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
