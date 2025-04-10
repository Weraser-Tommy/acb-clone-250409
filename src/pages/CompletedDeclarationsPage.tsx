
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck } from 'lucide-react';

// Mock data for completed declarations
// In a real app, this would come from a backend or local storage
const mockCompletedDeclarations = [
  { id: '1', reference: 'DCL-2025-001', productName: '전자제품 수입', date: '2025-04-08', status: '완료' },
  { id: '2', reference: 'DCL-2025-002', productName: '식품류', date: '2025-04-05', status: '완료' },
  { id: '3', reference: 'DCL-2025-003', productName: '의류 수입', date: '2025-04-01', status: '완료' },
  { id: '4', reference: 'DCL-2025-004', productName: '화장품', date: '2025-03-28', status: '완료' },
];

const CompletedDeclarationsPage: React.FC = () => {
  const { t } = useLanguage();
  
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CompletedDeclarationsPage;
