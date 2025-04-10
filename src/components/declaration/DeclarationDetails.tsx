
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText } from 'lucide-react';

interface Declaration {
  id: string;
  reference: string;
  productName: string;
  date: string;
  status: string;
  // Additional fields for details
  taxAmount?: string;
  dutyRate?: string;
  totalTaxAmount?: string;
  hsCode?: string;
  countryOrigin?: string;
  itemPrice?: string;
  declarationNumber?: string;
  declarationType?: 'import' | 'export';
}

interface DeclarationDetailsProps {
  declaration: Declaration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeclarationDetails: React.FC<DeclarationDetailsProps> = ({ 
  declaration, 
  open, 
  onOpenChange 
}) => {
  const { t } = useLanguage();

  // Format currency with Korean Won symbol
  const formatCurrency = (amount: string | undefined) => {
    if (!amount) return '-';
    return `₩ ${Number(amount).toLocaleString()}`;
  };

  if (!declaration) return null;

  const isImport = declaration.declarationType === 'import' || !declaration.declarationType;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            {t("declarationDetails") || "신고 상세 정보"}
          </DialogTitle>
          <DialogDescription>
            {declaration.reference} - {declaration.productName}
          </DialogDescription>
        </DialogHeader>

        <Card className="mt-2">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{t("basicInfo") || "기본 정보"}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("declarationReference") || "참조번호"}</span>
                    <span className="font-medium">{declaration.reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("declarationNumber") || "신고번호"}</span>
                    <span className="font-medium">{declaration.declarationNumber || '7-1-2025-0001234'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("declarationType") || "신고유형"}</span>
                    <span className="font-medium">{isImport ? (t("import") || "수입") : (t("export") || "수출")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("submissionDate") || "제출일"}</span>
                    <span className="font-medium">{declaration.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("status") || "상태"}</span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {declaration.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">{t("productInfo") || "제품 정보"}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("productName") || "제품명"}</span>
                    <span className="font-medium">{declaration.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("hsCode") || "HS코드"}</span>
                    <span className="font-medium">{declaration.hsCode || '8471.30.0000'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("countryOrigin") || "원산지"}</span>
                    <span className="font-medium">{declaration.countryOrigin || 'CN'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("itemPrice") || "물품가격(USD)"}</span>
                    <span className="font-medium">${declaration.itemPrice || '1,000'}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div>
              <h3 className="text-lg font-semibold mb-2">{t("taxInfo") || "세액 정보"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("dutyRate") || "관세율"}</span>
                    <span className="font-medium">{declaration.dutyRate || '8.0%'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("taxableAmount") || "과세가격"}</span>
                    <span className="font-medium">{formatCurrency(declaration.itemPrice ? String(Number(declaration.itemPrice) * 1300) : '1300000')}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("taxAmount") || "세액"}</span>
                    <span className="font-medium">{formatCurrency(declaration.taxAmount || '104000')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("totalTaxAmount") || "총 세액"}</span>
                    <span className="font-medium font-bold text-primary">{formatCurrency(declaration.totalTaxAmount || '104000')}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default DeclarationDetails;
