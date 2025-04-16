
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/layout/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, Download, Search, FileText, ExternalLink, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import DeclarationDetails from '@/components/declaration/DeclarationDetails';
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// Enhanced mock data for completed declarations
// In a real app, this would come from a backend or local storage
const mockCompletedDeclarations = [
  { 
    id: '1', 
    reference: 'DCL-2025-001', 
    productName: '전자제품 수입', 
    date: '2025-04-08', 
    status: '완료',
    declarationType: 'import' as const,
    taxAmount: '104000',
    dutyRate: '8.0%',
    totalTaxAmount: '104000',
    hsCode: '8471.30.0000',
    countryOrigin: 'CN',
    itemPrice: '1000000',
    declarationNumber: '7-1-2025-0001234',
    clearanceStep: '신고수리통보'
  },
  { 
    id: '2', 
    reference: 'DCL-2025-002', 
    productName: '식품류', 
    date: '2025-04-05', 
    status: '완료',
    declarationType: 'import' as const,
    taxAmount: '52000',
    dutyRate: '10.0%',
    totalTaxAmount: '52000',
    hsCode: '2103.90.9090',
    countryOrigin: 'US',
    itemPrice: '520000',
    declarationNumber: '7-1-2025-0001235',
    clearanceStep: '신고수리'
  },
  { 
    id: '3', 
    reference: 'DCL-2025-003', 
    productName: '의류 수입', 
    date: '2025-04-01', 
    status: '완료',
    declarationType: 'import' as const,
    taxAmount: '78000',
    dutyRate: '13.0%',
    totalTaxAmount: '78000',
    hsCode: '6104.63.0000',
    countryOrigin: 'VN',
    itemPrice: '600000',
    declarationNumber: '7-1-2025-0001236',
    clearanceStep: '결재'
  },
  { 
    id: '4', 
    reference: 'DCL-2025-004', 
    productName: '화장품', 
    date: '2025-03-28', 
    status: '완료',
    declarationType: 'import' as const,
    taxAmount: '65000',
    dutyRate: '6.5%',
    totalTaxAmount: '65000',
    hsCode: '3304.99.1000',
    countryOrigin: 'JP',
    itemPrice: '800000',
    declarationNumber: '7-1-2025-0001237',
    clearanceStep: '신고서접수'
  },
  { 
    id: '5', 
    reference: 'DCL-2025-005', 
    productName: '기계부품', 
    date: '2025-03-25', 
    status: '진행중',
    declarationType: 'import' as const,
    taxAmount: '120000',
    dutyRate: '8.0%',
    totalTaxAmount: '120000',
    hsCode: '8483.30.9000',
    countryOrigin: 'DE',
    itemPrice: '1500000',
    declarationNumber: '7-1-2025-0001238',
    clearanceStep: '심사'
  },
];

interface SearchFormValues {
  keyword: string;
}

const CompletedDeclarationsPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDeclaration, setSelectedDeclaration] = useState<typeof mockCompletedDeclarations[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [declarations, setDeclarations] = useState(mockCompletedDeclarations);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  
  const form = useForm<SearchFormValues>({
    defaultValues: {
      keyword: '',
    },
  });
  
  const handleViewDetails = (declaration: typeof mockCompletedDeclarations[0]) => {
    setSelectedDeclaration(declaration);
    setDetailsOpen(true);
  };
  
  const handleSearch = (values: SearchFormValues) => {
    const { keyword } = values;
    
    if (!keyword.trim()) {
      // Reset to original data if search is empty
      setDeclarations(mockCompletedDeclarations);
      return;
    }
    
    // Filter based on keyword (case insensitive)
    const filtered = mockCompletedDeclarations.filter(
      declaration => 
        declaration.productName.toLowerCase().includes(keyword.toLowerCase()) || 
        declaration.reference.toLowerCase().includes(keyword.toLowerCase()) ||
        declaration.declarationNumber.toLowerCase().includes(keyword.toLowerCase()) ||
        declaration.hsCode.toLowerCase().includes(keyword.toLowerCase())
    );
    
    setDeclarations(filtered);
  };
  
  const toggleStatusFilter = (status: string) => {
    setStatusFilter(current => 
      current.includes(status)
        ? current.filter(s => s !== status)
        : [...current, status]
    );
  };
  
  const filteredDeclarations = statusFilter.length > 0
    ? declarations.filter(d => statusFilter.includes(d.status))
    : declarations;
  
  const getStatusBadge = (status: string) => {
    if (status === '완료') {
      return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
    } else if (status === '진행중') {
      return <Badge className="bg-amber-500 hover:bg-amber-600">{status}</Badge>;
    }
    return <Badge>{status}</Badge>;
  };
  
  return (
    <Layout>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center mb-6">
          <FileCheck className="h-8 w-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold">{t("completedDeclarations") || "신고 완료 목록"}</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>{t("search") || "검색"}</CardTitle>
            <CardDescription>
              {t("searchDescription") || "신고번호, 제품명, HS코드 등으로 검색하세요"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSearch)} className="flex space-x-2">
                <FormField
                  control={form.control}
                  name="keyword"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex w-full items-center space-x-2">
                        <Input {...field} placeholder="검색어를 입력하세요" className="flex-1" />
                        <Button type="submit" className="flex items-center">
                          <Search className="mr-2 h-4 w-4" />
                          검색
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      필터
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem className="font-medium">상태별 필터</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes('완료')}
                      onCheckedChange={() => toggleStatusFilter('완료')}
                    >
                      완료
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilter.includes('진행중')}
                      onCheckedChange={() => toggleStatusFilter('진행중')}
                    >
                      진행중
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("completedDeclarationsTitle") || "신고 완료된 문서 목록"}</CardTitle>
            <CardDescription>
              {t("completedDeclarationsDescription") || "이전에 제출한 모든 신고서 목록입니다"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("declarationReference") || "참조번호"}</TableHead>
                    <TableHead>{t("declarationNumber") || "신고번호"}</TableHead>
                    <TableHead>{t("productName") || "제품명"}</TableHead>
                    <TableHead>{t("submissionDate") || "제출일"}</TableHead>
                    <TableHead>{t("clearanceStep") || "통관단계"}</TableHead>
                    <TableHead>{t("status") || "상태"}</TableHead>
                    <TableHead>{t("actions") || "작업"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeclarations.length > 0 ? (
                    filteredDeclarations.map((declaration) => (
                      <TableRow key={declaration.id}>
                        <TableCell className="font-medium">{declaration.reference}</TableCell>
                        <TableCell>{declaration.declarationNumber}</TableCell>
                        <TableCell>{declaration.productName}</TableCell>
                        <TableCell>{declaration.date}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center font-medium">
                            {declaration.clearanceStep}
                          </span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(declaration.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewDetails(declaration)}
                              className="text-xs"
                            >
                              <Search className="mr-1 h-3 w-3" />
                              {t("viewDetails") || "상세 보기"}
                            </Button>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-xs"
                            >
                              <Download className="mr-1 h-3 w-3" />
                              PDF
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        검색 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button asChild>
                <Link to="/declaration" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  새 신고서 작성
                </Link>
              </Button>
            </div>
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
