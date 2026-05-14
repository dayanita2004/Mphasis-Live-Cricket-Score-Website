import { useNavigate } from "react-router-dom";

function PageHeader({ title }) {
  const navigate = useNavigate();

  return (
    <div className="page-header">
      <h1>{title}</h1>

      <button
        className="back-btn"
        onClick={() => navigate("/admin/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default PageHeader;