import { useAppStore } from '../stores/appStore';

export const DataFetchingToggle = () => {
  const dataFetchingMethod = useAppStore(state => state.dataFetchingMethod);
  const setDataFetchingMethod = useAppStore(state => state.setDataFetchingMethod);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'white',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        zIndex: 1000,
        border: '2px solid #0984e3'
      }}
    >
      <span style={{ fontSize: '14px', fontWeight: '500' }}>
        Data Fetching:
      </span>
      <button
        style={{
          padding: '4px 8px',
          border: 'none',
          borderRadius: '4px',
          background: dataFetchingMethod === 'vanilla' ? '#0984e3' : '#e0e0e0',
          color: dataFetchingMethod === 'vanilla' ? 'white' : 'black',
          cursor: 'pointer',
          fontSize: '12px'
        }}
        onClick={() => setDataFetchingMethod('vanilla')}
      >
        Vanilla
      </button>
      <button
        style={{
          padding: '4px 8px',
          border: 'none',
          borderRadius: '4px',
          background:
            dataFetchingMethod === 'react-query' ? '#0984e3' : '#e0e0e0',
          color: dataFetchingMethod === 'react-query' ? 'white' : 'black',
          cursor: 'pointer',
          fontSize: '12px'
        }}
        onClick={() => setDataFetchingMethod('react-query')}
      >
        React Query
      </button>
    </div>
  );
};
