package com.pic.picapp.configuration;

//import lombok.Value;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.tomcat.jni.SSLContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;

import org.apache.http.auth.UsernamePasswordCredentials;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class RequestHelper {

    @Value("rb-proxy-apac.bosch.com")
    private String proxyHost;

    @Value("8080")
    private int proxyPort;

    @Value("sjr2kor")
    private String proxyUser;

    @Value("Arunkumar123")
    private String proxyPassword;

    public HttpComponentsClientHttpRequestFactory getRequestFactory() {

        HttpClientBuilder httpClientBuilder = HttpClients.custom();

        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(proxyUser, proxyPassword));
        httpClientBuilder = httpClientBuilder.setProxy(new HttpHost(proxyHost, proxyPort));
        httpClientBuilder = httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider);

        CloseableHttpClient httpClient = httpClientBuilder.build();
        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
        requestFactory.setHttpClient(httpClient);
        return requestFactory;
    }
}
