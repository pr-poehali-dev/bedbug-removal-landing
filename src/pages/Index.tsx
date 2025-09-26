import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Форма отправлена:", formData);
    // Здесь будет обработка отправки формы
  };

  const services = [
    {
      icon: "Shield",
      title: "Полное уничтожение",
      description: "Комплексная обработка всех помещений современными безопасными препаратами"
    },
    {
      icon: "Clock",
      title: "Быстрое решение",
      description: "Устраняем проблему клопов за 1 день с выездом в течение 2 часов"
    },
    {
      icon: "Heart",
      title: "Безопасно для семьи и животных",
      description: "Используем только сертифицированные препараты, полностью безвредные для детей, взрослых и домашних питомцев"
    },
    {
      icon: "CheckCircle",
      title: "Гарантия до 2 лет",
      description: "Предоставляем письменную гарантию и бесплатные повторные обработки"
    }
  ];

  const prices = [
    { area: "1-комнатная квартира", price: "от 3 500 ₽" },
    { area: "2-комнатная квартира", price: "от 4 500 ₽" },
    { area: "3-комнатная квартира", price: "от 5 500 ₽" },
    { area: "Частный дом", price: "от 150 ₽/м²" }
  ];

  const faqItems = [
    {
      question: "Как долго длится обработка?",
      answer: "Обработка квартиры занимает 1-2 часа в зависимости от площади и степени заражения."
    },
    {
      question: "Нужно ли покидать квартиру во время обработки?",
      answer: "Да, рекомендуется покинуть помещение на 3-4 часа. После проветривания можно безопасно находиться дома."
    },
    {
      question: "Что включает в себя гарантия?",
      answer: "Гарантия включает бесплатные повторные обработки в случае появления клопов в течение указанного срока."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary to-secondary/90 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary text-white text-sm font-medium px-4 py-2">
                Экстренный вызов 24/7
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Решаем проблему клопов 
                <span className="text-primary"> навсегда за 1 день</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                Профессиональное уничтожение клопов с гарантией до 2-х лет. 
                Безопасные методы для вашей семьи, детей и домашних животных.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-medium"
                >
                  <Icon name="Phone" size={20} className="mr-2" />
                  Вызвать специалиста
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-secondary px-8 py-4 text-lg"
                >
                  Рассчитать стоимость
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Выезд в течение 2 часов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={16} />
                  <span>Гарантия до 2 лет</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/92486ad3-0ded-4b63-9b7c-4bcbb659393c.jpg" 
                alt="Безопасный дом после обработки от клопов"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Наши преимущества
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Используем современные технологии и проверенные методы для полного избавления от клопов
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name={service.icon} size={32} className="text-success" />
                  </div>
                  <CardTitle className="text-xl text-secondary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Прозрачные цены
            </h2>
            <p className="text-lg text-gray-600">
              Фиксированная стоимость без скрытых платежей
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {prices.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-secondary">{item.area}</h3>
                    </div>
                    <div className="text-2xl font-bold text-primary">{item.price}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              Получить точный расчет
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
                Оставьте заявку
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Специалист свяжется с вами в течение 10 минут для уточнения деталей и назначения времени выезда
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <span className="text-lg font-medium">+7 918 607 39 89</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <span>Работаем круглосуточно, без выходных</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <span>Выезжаем по всей Москве и области</span>
                </div>
              </div>
            </div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-secondary">Быстрая заявка</CardTitle>
                <CardDescription>
                  Заполните форму и получите скидку 10% на первую обработку
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Номер телефона"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Адрес обработки"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Опишите проблему (необязательно)"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium"
                  >
                    Отправить заявку
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Частые вопросы
            </h2>
            <p className="text-lg text-gray-600">
              Ответы на самые популярные вопросы о нашей услуге
            </p>
          </div>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-secondary mb-3">{item.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">СЭС МСК</h3>
              <p className="text-gray-300 leading-relaxed">
                Профессиональное уничтожение клопов с гарантией качества. 
                Работаем быстро, эффективно и безопасно.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-300">
                <p>Телефон: +7 918 607 39 89</p>
                <p>Email: info@company.ru</p>
                <p>Работаем: 24/7</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Услуги</h4>
              <div className="space-y-2 text-gray-300">
                <p>Уничтожение клопов</p>
                <p>Дезинсекция помещений</p>
                <p>Профилактическая обработка</p>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-600" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 СЭС МСК. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;