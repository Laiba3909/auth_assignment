import './style.css';
import Link from 'next/link';

function App() {
  return (
    <div>
      <div className='box1'>
        <div className="box2">
          <h2>Welcome to Our Website</h2>
          <button>
          <Link href="/SignUp">Sign Up</Link>
          </button>
        
        </div>
      </div>
    </div>
  );
}

export default App;

