import React from 'react';
// const { scrollYProgress } = useScroll();
// This assumes you are using standard Bootstrap 5 classes
const ProductDetailModal = ({ show, handleClose, product }) => {
  // Do not render if the modal is hidden or product data is missing
  if (!show || !product) {
    return null;
  }

  // Helper function to render list items for arrays (Uses, Indications, Composition)
  const renderList = (items) => (
    <ul className="list-group list-group-flush small mb-3">
      {items.map((item, index) => {
        let content = '';
        if (typeof item === 'string') {
          content = item;
        } else if (item.name && item.strength) {
          content = `${item.name} (${item.strength})`;
        } else if (item.drug && item.moa) {
          content = (
            <>
              <strong>{item.drug}:</strong> {item.moa}
            </>
          );
        } else {
          content = JSON.stringify(item);
        }
        return (
          <li key={index} className="list-group-item">
            {content}
          </li>
        );
      })}
    </ul>
  );
  
  // Custom style to ensure the modal is visible and centered
  const modalStyle = {
    display: show ? 'block' : 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1050, // Ensure it's above other elements
    paddingRight: '17px', // Standard Bootstrap scrollbar padding
  };

  return (
    <div className="modal fade show" style={modalStyle} tabIndex="-1" role="dialog" aria-hidden={!show}>
        
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
        <div className="modal-content">
          
          <div className="modal-header" style={{backgroundColor: product.color || '#EAF5FF'}}>
            <h5 className="modal-title fw-bold text-white">
              Full Data for: {product.productName}
            </h5>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          
          <div className="modal-body p-4">
            
            {/* Basic Info */}
            <h6 className="text-uppercase text-primary fw-bold mb-3">Product Overview</h6>
            <div className="row g-3 mb-4">
                <div className="col-md-4"><small className="text-muted d-block">Generic Name</small><strong>{product.genericName || 'N/A'}</strong></div>
                <div className="col-md-4"><small className="text-muted d-block">Brand Name</small><strong>{product.brandName || 'N/A'}</strong></div>
                <div className="col-md-4"><small className="text-muted d-block">Strength</small><strong>{product.strength || 'N/A'}</strong></div>
                <div className="col-md-4"><small className="text-muted d-block">Dosage Form</small><strong>{product.dosageForm || 'N/A'}</strong></div>
                <div className="col-md-4"><small className="text-muted d-block">Pack Size</small><strong>{product.packSize || 'N/A'}</strong></div>
                <div className="col-md-4"><small className="text-muted d-block">Route</small><strong>{product.administrationRoute || 'N/A'}</strong></div>
                <div className="col-md-4"><small className="text-muted d-block">Prescription Required</small><strong>{product.prescriptionRequired ? 'Yes' : 'No'}</strong></div>
                <div className="col-md-4"><small className="text-muted d-block">Storage</small><strong>{product.storage || 'N/A'}</strong></div>
            </div>

            <hr />

            {/* Composition */}
            {product.composition && product.composition.length > 0 && (
                <div className="mb-4">
                    <h6 className="text-uppercase text-primary fw-bold mb-2">Active Composition</h6>
                    {renderList(product.composition)}
                </div>
            )}
            
            {/* Uses */}
            {product.uses && product.uses.length > 0 && (
                <div className="mb-4">
                    <h6 className="text-uppercase text-primary fw-bold mb-2">Therapeutic Uses</h6>
                    {renderList(product.uses)}
                </div>
            )}

            {/* Indications */}
            {product.indications && product.indications.length > 0 && (
                <div className="mb-4">
                    <h6 className="text-uppercase text-primary fw-bold mb-2">Key Indications</h6>
                    {renderList(product.indications)}
                </div>
            )}

            {/* Mechanism of Action */}
            {product.mechanismOfAction && product.mechanismOfAction.length > 0 && (
                <div className="mb-4">
                    <h6 className="text-uppercase text-primary fw-bold mb-2">Mechanism of Action (MOA)</h6>
                    {renderList(product.mechanismOfAction)}
                </div>
            )}

            {/* Contraindications */}
            {product.contraindications && product.contraindications.length > 0 && (
                <div className="mb-4">
                    <h6 className="text-uppercase text-danger fw-bold mb-2">Contraindications</h6>
                    {renderList(product.contraindications)}
                </div>
            )}

          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;