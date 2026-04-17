import CompanyCard from '../../common/CompanyCard';
import SectionLabel from '../../common/SectionLabel';
import { COMPANIES } from '../../../constants/companies';
import { COLORS } from '../../../constants/theme';

interface CompanyCollectionsProps {
  selectedCompany: string | null;
  onSelect: (companyId: string | null) => void;
}

const CompanyCollections = ({ selectedCompany, onSelect }: CompanyCollectionsProps) => {
  const handleClick = (companyId: string): void => {
    onSelect(selectedCompany === companyId ? null : companyId);
  };

  return (
    <div style={{ background: COLORS.surfaceContainerLow, borderRadius: 12, padding: 24 }}>
      <SectionLabel>Company Collections</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {COMPANIES.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            isSelected={selectedCompany === company.id}
            onClick={() => handleClick(company.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyCollections;
