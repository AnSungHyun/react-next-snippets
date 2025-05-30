// app/examples/date-utils/page.tsx
'use client'

import React, {useEffect, useState} from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import {
  getCurrentDateTime,
  getCurrentDate,
  getDayOfWeek,
  formatDate,
  addDays,
  subtractDays,
  differenceInDays,
  isBefore,
  isToday,
} from '@/utils/dateUtils';
import CodeBlock from '@/app/_component/CodeBlock';

export default function DateUtilsExample() {
  const [currentTime, setCurrentTime] = useState<string>('로딩 중...');
  const [currentDate, setCurrentDate] = useState<string>('로딩 중...');
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState<string>('로딩 중...');
  const [customDate, setCustomDate] = useState('2025-03-26');
  const [daysToAdd, setDaysToAdd] = useState(5);
  const [compareDate1, setCompareDate1] = useState('2025-03-25');
  const [compareDate2, setCompareDate2] = useState('2025-03-26');

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(getCurrentDateTime());
      setCurrentDate(getCurrentDate());
      setCurrentDayOfWeek(getDayOfWeek(new Date()));
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const DateDisplayCard = ({ title, content }: { title: string; content: string | number | boolean }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" component="div">
          {String(content)}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          현재 시간 정보
        </Typography>
        <Grid container spacing={3}>
          <Grid>
            <DateDisplayCard title="현재 날짜/시간" content={currentTime} />
          </Grid>
          <Grid>
            <DateDisplayCard title="현재 날짜" content={currentDate} />
          </Grid>
          <Grid>
            <DateDisplayCard title="오늘 요일" content={currentDayOfWeek} />
          </Grid>
        </Grid>
        <CodeBlock value={
          "import {\n" +
          "  getCurrentDateTime,\n" +
          "  getCurrentDate,\n" +
          "  getDayOfWeek,\n" +
          "} from '@/utils/dateUtils';" +
          "\n\n" +
          "// 현재 날짜/시간 가져오기\n" +
          "getCurrentDateTime() // '2025-03-26 14:30:00'\n\n" +
          "// 현재 날짜 가져오기\n" +
          "getCurrentDate() // '2025-03-26'\n\n" +
          "// 현재 요일 가져오기\n" +
          "getDayOfWeek(new Date()) // '수요일'\n\n"
        }/>
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          날짜 계산
        </Typography>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="기준 날짜"
            type="date"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            label="더하거나 뺄 일수"
            type="number"
            value={daysToAdd}
            onChange={(e) => setDaysToAdd(Number(e.target.value))}
          />
        </Box>
        <Grid container spacing={3}>
          <Grid>
            <DateDisplayCard
              title={`${daysToAdd}일 후`}
              content={addDays(customDate, daysToAdd)}
            />
          </Grid>
          <Grid>
            <DateDisplayCard
              title={`${daysToAdd}일 전`}
              content={subtractDays(customDate, daysToAdd)}
            />
          </Grid>
          <Grid>
            <DateDisplayCard
              title="오늘인가요?"
              content={isToday(customDate) ? '네' : '아니오'}
            />
          </Grid>
        </Grid>
        <CodeBlock value={
          "import {\n" +
          "  addDays,\n" +
          "  subtractDays,\n" +
          "  isToday,\n" +
          "} from '@/utils/dateUtils';" +
          "\n\n" +
          "// 날짜에 일수 더하기\n" +
          "addDays('2025-03-26', 5) // '2025-03-31'\n\n" +
          "// 날짜에서 일수 빼기\n" +
          "subtractDays('2025-03-26', 5) // '2025-03-21'\n\n" +
          "// 오늘인지 확인\n" +
          "isToday('2025-03-26') // false (현재 날짜가 다를 경우)\n\n"
        }/>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          날짜 비교
        </Typography>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="첫 번째 날짜"
            type="date"
            value={compareDate1}
            onChange={(e) => setCompareDate1(e.target.value)}
            sx={{ mr: 2 }}
          />
          <TextField
            label="두 번째 날짜"
            type="date"
            value={compareDate2}
            onChange={(e) => setCompareDate2(e.target.value)}
          />
        </Box>
        <Grid container spacing={3}>
          <Grid>
            <DateDisplayCard
              title="두 날짜의 차이 (일)"
              content={differenceInDays(compareDate1, compareDate2)}
            />
          </Grid>
          <Grid>
            <DateDisplayCard
              title="첫 번째 날짜가 이전인가요?"
              content={isBefore(compareDate1, compareDate2) ? '네' : '아니오'}
            />
          </Grid>
        </Grid>
        <CodeBlock value={
          "import {\n" +
          "  differenceInDays,\n" +
          "  isBefore,\n" +
          "} from '@/utils/dateUtils';" +
          "\n\n" +
          "// 두 날짜의 차이 (일)\n" +
          "differenceInDays('2025-03-25', '2025-03-26') // -1\n\n" +
          "// 첫 번째 날짜가 두 번째 날짜보다 이전인지 확인\n" +
          "isBefore('2025-03-25', '2025-03-26') // true\n\n"
        }/>
      </Paper>
    </Container>
  );
}