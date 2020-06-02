from dateutil.rrule import *
from dateutil.parser import *
from datetime import *

def is_day_within_staff_schedule(schedule, day):
  #populate rruleset with staff schedule hours
  rules = rruleset()
  #push rrule to rruleset if rules are present
  if schedule.rRule!= None:
    rules.rrule(rrulestr(schedule.rRule, dtstart=parse(schedule.startDate)))
    if schedule.exDate!=None:
      #exclude all days that are in exDate field
      exDates = schedule.exDate.split(',')
      for exDate in exDates:
        rules.exdate(parse(exDate))
  #make rule and push it to rrule if rrule field is empty
  else:
    rules.rrule(rrule(MINUTELY, interval=1, dtstart=parse(schedule.startDate), until=parse(schedule.endDate)))
  #get day information from provided day info and hours, minutes from schedule
  year = day.year
  month = day.month
  day = day.day
  start_hour = parse(schedule.startDate).hour
  end_hour = parse(schedule.endDate).hour
  start_minute = parse(schedule.startDate).minute
  end_minute = parse(schedule.endDate).minute
  
  return datetime(year, month, day, start_hour, start_minute, tzinfo=timezone.utc) in rules

def get_rruleset_day_with_sales_excluded(day, saleInstances, interval, exclude_minutes, start_hour, start_minute, end_hour, end_minute):
  year = day.year
  month = day.month
  day = day.day
  #form timedelta to be able to substract this value 
  servicesDuration = timedelta(minutes=exclude_minutes)
  time_rules = rruleset()
  #push day with start, end hours of staff schedule provided as params and provided day
  time_rules.rrule(rrule(MINUTELY, interval=interval, 
    dtstart=datetime(year, month, day, start_hour, start_minute, tzinfo=timezone.utc), 
    until=datetime(year, month, day, end_hour, end_minute, tzinfo=timezone.utc)-servicesDuration
  ))
  #exclude all appointments already booked
  for sale in saleInstances:
    saleExDate = parse(sale.startDate)

    time_rules.exrule(rrule(MINUTELY, interval=1, 
      dtstart=datetime(saleExDate.year, saleExDate.month, saleExDate.day, saleExDate.hour, saleExDate.minute, tzinfo=timezone.utc),
      until=parse(sale.endDate)
    ))
  return time_rules


def generate_timetable(staff_id, serviceInstances, scheduleInstances, saleInstances, day):
  result = {}
  result['staff'] = staff_id
  result['time_table'] = []
  for schedule in scheduleInstances:
    if is_day_within_staff_schedule(schedule, day):
      interval = 0
      exclude_minutes = 0
      for service in serviceInstances:
        interval = service.interval if service.interval>interval else interval
        exclude_minutes += service.minutes + service.hours*60

      start_hour = parse(schedule.startDate).hour
      end_hour = parse(schedule.endDate).hour
      start_minute = parse(schedule.startDate).minute
      end_minute = parse(schedule.endDate).minute

      time_rules = get_rruleset_day_with_sales_excluded(day=day, saleInstances=saleInstances, interval=interval, exclude_minutes=exclude_minutes,
        start_hour=start_hour, start_minute=start_minute, end_hour=end_hour, end_minute=end_minute)
      result['time_table'] += list(time_rules)
  return result

def get_list_of_parent_categories(category, categories):
  parent_categories = []
  parent_category = next(cat for cat in categories if cat['id']==category['parent'])
  parent_categories.append(parent_category)
  if parent_category['parent']:
    parent_categories += get_list_of_parent_categories(parent_category, categories)
  return parent_categories

def get_list_of_service_categories(services, categories):
  non_empty_categories = []
  for service in services:
    if service['category']:
      category = next(cat for cat in categories if cat['id']==service['category'])
      non_empty_categories.append(category)
      if category['parent']:
        non_empty_categories += get_list_of_parent_categories(category, categories)
  #using frozenset to remove duplicates
  res_cat_list = {frozenset(item.items()) : item for item in non_empty_categories}.values() 
  return res_cat_list
