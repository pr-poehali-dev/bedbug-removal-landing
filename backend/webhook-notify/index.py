import json
import os
import requests
from datetime import datetime
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Отправка заявок с сайта СЭС через webhook
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
    
    # Получение URL webhook
    webhook_url = os.environ.get('WEBHOOK_URL')
    
    if not webhook_url:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Webhook не настроен'})
        }
    
    # Подготовка данных для отправки
    current_time = datetime.now().strftime('%d.%m.%Y %H:%M')
    
    webhook_data = {
        'timestamp': current_time,
        'source': 'СЭС сайт',
        'client_name': name,
        'client_phone': phone,
        'client_address': address if address else None,
        'client_message': message if message else None,
        'service_type': 'Уничтожение насекомых',
        'urgency': 'high'
    }
    
    # Отправка через webhook
    try:
        response = requests.post(
            webhook_url, 
            json=webhook_data,
            headers={
                'Content-Type': 'application/json',
                'User-Agent': 'SES-Website/1.0'
            },
            timeout=10
        )
        
        if response.status_code in [200, 201, 202]:
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True, 
                    'message': 'Заявка отправлена',
                    'id': context.request_id[:8]
                })
            }
        else:
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Webhook ошибка: {response.status_code}'})
            }
            
    except requests.exceptions.RequestException as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Ошибка соединения с webhook'})
        }