import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Admin: React.FC<AdminProps> = () => {
  const history = useHistory();
  const { id } = useParams();

  const [username, setUsername] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMessage(e.target.value);

  useEffect(() => {
    (async () => {
      let res = await fetch(`/api/chirps/${id}`);
      let chirp = await (await res).json();

      setUsername(chirp.username);
      setMessage(chirp.message);
    })();
  }, [id]);

  const saveEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let res = await fetch(`/api/chirps/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, message }),
    });
    if (res.ok) {
      history.push(`/details/${id}`);
    } else {
      console.log('something went wrong:(');
    }
  };

  const deleteChirp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let res = await fetch(`/api/chirps/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      history.push('/');
    } else {
      console.log('something went wrong:(');
    }
  };

  return (
    <main className='container'>
      <section className='row my-2 justify-content-center'>
        <div className='col-md-8'>
          <form className='form-group p-3 shadow border rounded'>
            <label htmlFor=''>Username</label>
            <input
              value={username}
              onChange={handleUsernameChange}
              placeholder='Who be chirpin?'
              id='username'
              type='text'
              className='form-control'
            />
            <label htmlFor='message'>Message</label>
            <textarea
              value={message}
              onChange={handleMessageChange}
              rows={8}
              placeholder='What you be chirpin?'
              className='form-control'
              name='message'
              id='message'
            />
            <button
              onClick={saveEdit}
              className='btn btn-outline-primary btn-block mt-3 w-75 mx-auto shadow-sm'
            >
              Save It
            </button>
            <button
              onClick={deleteChirp}
              className='btn btn-outline-danger btn-block mt-3 w-75 mx-auto shadow-sm'
            >
              Crush It
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

interface AdminProps {}

export default Admin;
