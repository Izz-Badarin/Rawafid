#!/usr/bin/env python3
import re

with open('d:/github repo/Rawafid/src/App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Change 1: inverterName
old1 = "inverterName: 'انفيرتر (Inverter): ماركة ديي بقدرة 50 كيلوواط 3 فاز',"
new1 = "inverterName: 'انفيرتر (Inverter): ماركة ديي',"
content = content.replace(old1, new1)

# Change 2: inverterWarranty
old2 = "inverterWarranty: '2 سنة على الانفيرتر',"
new2 = "inverterWarranty: '2 سنة ضمان',"
content = content.replace(old2, new2)

# Change 3: inverterPrice
old3 = "inverterPrice: 6800,"
new3 = "inverterPrice: 0,"
content = content.replace(old3, new3)

# Change 4: batteryName
old4 = "batteryName: 'بطارية تخزين (Lithium Battery): ماركة ديي BOS-G بسعة تخزين عالية',"
new4 = "batteryName: 'بطارية تخزين (BESS): ماركة ديي',"
content = content.replace(old4, new4)

# Change 5: batteryWarranty
old5 = "batteryWarranty: '10 سنوات للبطارية',"
new5 = "batteryWarranty: '10 سنوات ضمان',"
content = content.replace(old5, new5)

# Change 6: batteryPrice
old6 = "batteryPrice: 14500,"
new6 = "batteryPrice: 0,"
content = content.replace(old6, new6)

# Change 7: panelName
old7 = "panelName: 'الواح شمسية: ماركة جينكو بقدرة 720 واط ذات كفاءة وعمر تشغيلي عالي',"
new7 = "panelName: 'الواح شمسية: ماركة جينكو',"
content = content.replace(old7, new7)

# Change 8: panelWarranty (keep same)
old8 = "panelWarranty: '12 سنة مصنعية + 25 سنة كفالة إنتاج',"
new8 = "panelWarranty: '12 سنة مصنعية + 25 سنة كفالة إنتاج',"
content = content.replace(old8, new8)

# Change 9: structurePrice (keep same)
old9 = "structurePrice: 2500,"
new9 = "structurePrice: 2500,"
content = content.replace(old9, new9)

# Change 10: protectionName (keep same)
old10 = "protectionName: 'قواطع حماية DC/AC، موصلات MC4 وحماية صواعق DC SPD',"
new10 = "protectionName: 'قواطع حماية DC/AC، موصلات MC4 وحماية صواعق DC SPD',"
content = content.replace(old10, new10)

# Change 11: protectionWarranty (keep same)
old11 = "protectionWarranty: '5 سنوات استبدال',"
new11 = "protectionWarranty: '5 سنوات استبدال',"
content = content.replace(old11, new11)

# Change 12: protectionPrice (keep same)
old12 = "protectionPrice: 950,"
new12 = "protectionPrice: 950,"
content = content.replace(old12, new12)

# Change 13: laborName (keep same)
old13 = "laborName: 'أجور التركيب وفريق المهندسين والفحص والتشغيل',"
new13 = "laborName: 'أجور التركيب وفريق المهندسين والفحص والتشغيل',"
content = content.replace(old13, new13)

# Change 14: laborWarranty (keep same)
old14 = "laborWarranty: 'كفالة تركيب وتشغيل',"
new14 = "laborWarranty: 'كفالة تركيب وتشغيل',"
content = content.replace(old14, new14)

# Change 15: laborPrice (keep same)
old15 = "laborPrice: 1500,"
new15 = "laborPrice: 1500,"
content = content.replace(old15, new15)

# Change 16: discount
old16 = "discount: 500,"
new16 = "discount: 0,"
content = content.replace(old16, new16)

# Change 17: paymentTerms
old17 = "paymentTerms: 'الدفع نقدا / حسب الاتفاق',"
new17 = "paymentTerms: 'الدفع نقداً أو حسب الاتفاق',"
content = content.replace(old17, new17)

# Change 18: termsText - ensure Palestinian context is included
old18 = "termsText: `1. تكون جميع الكفاالت mentioned above خاضعة ومقيدة بالكامل، وفقا لشروط واحكام الشركات المصنعة للأجهزة والمعدات.`"
new18 = "termsText: `1. تكون جميع الكفالات المذكورة أعلاه خاضعة ومقيدة بالكامل، وفقا لشروط واحكام الشركات المصنعة للأجهزة والمعدات.\n2. إن الإنتاجية المتوقعة للنظام المذكور تم حسابها ضمن الظروف والمقاييس المعيارية العالمية وقد تتأثر كفاءة هذا الإنتاج صعوداً أو هبوطاً تبعاً لتغير الظروف الجوية والبيئية المحيطة.\n3. تكون حسابات الطاقة والإنتاجية المتوقعة للنظام مرتبطة ومقيدة بحد وكفاءة الأجهزة والبطاريات والألواح المذكورة في ورقة البيانات الفنية (DATA SHEET) الخاصة بكل منها.\n4. تنحصر مسؤولية الشركة الفنية والقانونية في تحقيق الإنتاجية المتوقعة للنظام، ولا تتحمل الشركة أي مسؤولية تجاه قيمة أو كمية استهلاك الزبون الفعلي للكهرباء.\n5. تخلص الشركة من مسؤوليتها totally ولا تتحمل أي تبعات ناتجة عن وجود أخطاء أو مشاكل كهربائية مسبقة أو خاصة بالمبنى نفسه.\n6. السعر المعروض نهائي وشامل ضريبة القيمة المضافة (VAT).\n7. يعتبر هذا العرض ساري المفعول لمدة 10 أيام من تاريخ إصدار العرض، وبعد ذلك يمكن أن تطرأ تغيرات على الأسعار بناءً على الظروف السوقية.\n8. لا تتحمل الشركة مسؤولية أي أعمال تخريب أو تكسير أو حوادث طبيعية أو أي عبث وتعديل في إعدادات النظام من قبل أي أطراف خارجية خارج الطاقم الفني المعتمد للشركة.\n9. تزامنا مع حرصنا على جودة واستدامة الأداء، تتعهد الشركة بالمتابعة والمراقبة الحثيثة للنظام لمدة ثلاثة (3) شهور كاملة من تاريخ التشغيل الفعلي، للتأكد من عمل النظام بأقصى كفاءة إنتاجية، ومراقبة مستويات الاستقرار، وحل أي مشاكل تقنية قد تظهر فوراً لضمان تشغيل آمن ومستدام.\n10. شركة روافد لحلول الطاقة - Rawafid Energy Solutions | مرخصة للعمل في فلسطين والشرق الأوسط.\n11. نلتزم بجميع المعايير والاشتراطات الفلسطينية ذات العلاقة بالطاقة الشمسية والمباني.\n12. نقدم دعم فني وضمان ما بعد البيع لكل المشاريع في فلسطين والخارج.`"
content = content.replace(old18, new18)

with open('d:/github repo/Rawafid/src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Modifications complete')