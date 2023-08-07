import { Form } from 'react-bootstrap';

type PageSizeSelectorProps = {
  pageSize: number;
  handlePageSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  handlePageSizeChange,
}) => {
  return (
    <div className="d-flex justify-content-between">
      <Form.Select value={pageSize} onChange={handlePageSizeChange}>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Form.Select>
    </div>
  );
};