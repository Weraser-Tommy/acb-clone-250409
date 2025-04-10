
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DeclarationDetails from '@/components/declaration/DeclarationDetails';

// Enhanced mock data for completed declarations
// In a real app, this would come from a backend or local storage
const mockCompletedDeclarations = [
  { 
    id: '1', 
    reference: 'DCL-2025-001', 
    productName: '전자제품 수입', 
    date: '2025-04-08', 
    status: '완료',
    declarationType: 'import',
    taxAmount: '104000',
    dutyRate: '8.0%',
    totalTaxAmount: '104000',
    hsCode: '8471.30.0000',
    countryOrigin: 'CN',
    itemPrice: '1000',
    declarationNumber: '7-1-2025-0001234'
  },
  { 
    id: '2', 
    reference: 'DCL-2025-002', 
    productName: '식품류', 
    date: '2025-04-05', 
    status: '완료',
    declarationType: 'import',
    taxAmount: '52000',
    dutyRate: '10.0%',
    totalTaxAmount: '52000',
    hsCode: '2103.90.9090',
    countryOrigin: 'US',
    itemPrice: '400',
    declarationNumber: '7-1-2025-0001235'
  },
  { 
    id: '3', 
    reference: 'DCL-2025-003', 
    productName: '의류 수입', 
    date: '2025-04-01', 
    status: '완료',
    declarationType: 'import',
    taxAmount: '78000',
    dutyRate: '13.0%',
    totalTaxAmount: '78000',
    hsCode: '6104.63.0000',
    countryOrigin: 'VN',
    itemPrice: '600',
    declarationNumber: '7-1-2025-0001236'
  },
  { 
    id: '4', 
    reference: 'DCL-2025-004', 
    productName: '화장품', 
    date: '2025-03-28', 
    status: '완료',
    declarationType: 'import',
    taxAmount: '65000',
    dutyRate: '6.5%',
    totalTaxAmount: '65000',
    hsCode: '3304.99.1000',
    countryOrigin: 'JP',
    itemPrice: '800',
    declarationNumber: '7-1-2025-0001237'
  },
];

const CompletedDeclarationsPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDeclaration, setSelectedDeclaration] = useState<typeof mockCompletedDeclarations[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const handleViewDetails = (declaration: typeof mockCompletedDeclarations[0]) => {
    setSelectedDeclaration(declaration);
    setDetailsOpen(true);
  };
  
  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center mb-6">
          <FileCheck className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold">{t("completedDeclarations") || "신고 완료 목록"}</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("completedDeclarationsTitle") || "신고 완료된 문서 목록"}</CardTitle>
            <CardDescription>
              {t("completedDeclarationsDescription") || "이전에 제출한 모든 신고서 목록입니다"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("declarationReference") || "참조번호"}</TableHead>
                  <TableHead>{t("productName") || "제품명"}</TableHead>
                  <TableHead>{t("submissionDate") || "제출일"}</TableHead>
                  <TableHead>{t("status") || "상태"}</TableHead>
                  <TableHead>{t("actions") || "작업"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCompletedDeclarations.map((declaration) => (
                  <TableRow key={declaration.id}>
                    <TableCell className="font-medium">{declaration.reference}</TableCell>
                    <TableCell>{declaration.productName}</TableCell>
                    <TableCell>{declaration.date}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {declaration.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(declaration)}
                        className="text-xs"
                      >
                        {t("viewDetails") || "상세 보기"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Declaration Details Dialog */}
      <DeclarationDetails 
        declaration={selectedDeclaration} 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen} 
      />
    </Layout>
  );
};

export default CompletedDeclarationsPage;
