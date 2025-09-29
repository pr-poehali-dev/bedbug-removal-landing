import json
import os
import requests
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Отправка заявок с сайта СЭС в Telegram
    Args: event - данные HTTP запроса с полями name, phone, address, message
          context - контекст выполнения функции
    Returns: JSON ответ с результатом отправки
    """
    method: str = event.get('httpMethod', 'GET')
    
    # Обработка CORS запросов
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    # Получение данных из формы
    try:
        body_data = json.loads(event.get('body', '{}'))
        name = body_data.get('name', '').strip()
        phone = body_data.get('phone', '').strip()
        address = body_data.get('address', '').strip()
        message = body_data.get('message', '').strip()
        
        if not name or not phone:
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Имя и телефон обязательны'})
            }
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный формат данных'})
        }
    
    # Получение настроек Telegram
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_GROUP_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Telegram не настроен'})
        }
    
    # Формирование сообщения
    telegram_message = f"""🚨 *НОВАЯ ЗАЯВКА СЭС*

👤 *Клиент:* {name}
📞 *Телефон:* {phone}"""
    
    if address:
        telegram_message += f"\n📍 *Адрес:* {address}"
    
    if message:
        telegram_message += f"\n💬 *Сообщение:* {message}"
    
    telegram_message += f"\n\n⏰ Время: {context.request_id[:8]}"
    
    # Отправка в Telegram
    try:
        telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        telegram_data = {
            'chat_id': chat_id,
            'text': telegram_message,
            'parse_mode': 'Markdown'
        }
        
        response = requests.post(telegram_url, json=telegram_data, timeout=10)
        
        if response.status_code == 200:
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
            }
        else:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Ошибка отправки в Telegram'})
            }
            
    except requests.exceptions.RequestException:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Ошибка соединения с Telegram'})
        }