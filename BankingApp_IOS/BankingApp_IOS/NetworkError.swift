//
//  NetworkError.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 17.06.24.
//

import Foundation

enum NetworkError: Error {
    case failedPayLoadEncoding
    case failedPayLoadDecoding
    case invalidURL
    case noData
    case failedConnection
}
